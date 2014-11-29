# Git Workflow

You're ready to push your_branch, that's awesome... before you do:

From *your_branch* -- stage your local changes.

```sh
git add .
git commit -m 'my local changes'
```

Switch to master branch, fetch it from origin:
```sh
git checkout master
git pull origin master
```

Switch back to your_branch and rebase your branch with master:
```sh
git checkout your_branch
git rebase master
```

Push *your_branch* to origin
```sh
git push origin your_branch
```

Now submit a pull request and have someone review it:

Have your reviewe refresh the local clone, then checkout origin/your_branch on their machine:
```sh
git fetch origin
git checkout origin/your_branch
```

Run the server, run tests, and approve it.

You're done!
