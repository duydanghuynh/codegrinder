package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	. "github.com/russross/codegrinder/types"
	"github.com/spf13/cobra"
)

func CommandType(cmd *cobra.Command, args []string) {
	mustLoadConfig(cmd)

	remove := cmd.Flag("remove").Value.String() == "true"
	list := cmd.Flag("list").Value.String() == "true"

	if list {
		if len(args) != 0 || remove {
			fmt.Println("warning: for a list request, other options will be ignored")
		}

		// display a list of problem types
		fmt.Println("Problem types:")
		problemTypes := []*ProblemType{}
		mustGetObject("/problem_types", nil, &problemTypes)
		if len(problemTypes) == 0 {
			log.Fatalf("no problem types found")
		}
		maxLen := 0
		for _, pt := range problemTypes {
			if len(pt.Name) > maxLen {
				maxLen = len(pt.Name)
			}
		}
		for _, pt := range problemTypes {
			var actions []string
			for action := range pt.Actions {
				actions = append(actions, action)
			}
			fmt.Printf("    %-*s  actions: %s\n", maxLen, pt.Name, strings.Join(actions, ", "))
		}
		return
	}

	// figure out the problem type and directory
	directory, problemTypeName := ".", ""
	if len(args) == 0 {
		// look for a problem.cfg file
		_, stepDir, stepDirN, problem, steps, single := findProblemCfg(time.Now(), ".")
		if problem == nil {
			log.Fatalf("you must supply the problem type or have a valid %s file already in place", ProblemConfigName)
		}
		if !single && stepDirN < 1 {
			log.Fatalf("you must run this from within a step directory")
		}
		directory = filepath.Clean(stepDir)
		if single {
			problemTypeName = steps[0].ProblemType
		} else {
			problemTypeName = steps[stepDirN-1].ProblemType
		}
	} else if len(args) == 1 {
		// problem type supplied as an argument
		problemTypeName = args[0]
	} else {
		cmd.Help()
		os.Exit(1)
	}

	// download files for the given problem type
	problemType := new(ProblemType)
	mustGetObject(fmt.Sprintf("/problem_types/%s", problemTypeName), nil, problemType)

	// remove the on-disk file if it exists
	// if that leaves an empty directory, remove it as well
	removeFile := func(name string) {
		path := filepath.Join(directory, name)
		_, err := os.Stat(path)
		if err != nil && os.IsNotExist(err) {
			return
		}
		if err != nil {
			log.Fatalf("while checking %s: %v", path, err)
		}

		fmt.Printf("removing file %s\n", name)
		if err := os.Remove(path); err != nil {
			log.Fatalf("removing %s: %v", name, err)
		}

		// try removing the parent directories
		parent := filepath.Dir(path)
		for parent != directory {
			err := os.Remove(parent)
			if err == nil {
				fmt.Printf("  removed empty directory %s\n", parent)
				next := filepath.Dir(parent)
				if next == parent {
					break
				}
				parent = next
			} else {
				break
			}
		}
	}

	// save each file
	for name, contents := range problemType.Files {
		if remove {
			removeFile(filepath.FromSlash(name))
		} else {
			checkAndUpdate(directory, filepath.FromSlash(name), contents)
		}
	}
}
