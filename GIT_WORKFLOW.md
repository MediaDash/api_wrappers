# Git Workflow

You're ready to push your_branch, that's awesome... before you do:

From *your_branch* -- stage your local changes.

```sh
git add .
git commit -m 'my local changes'
```

Fetch master from origin and rebase your branch with them:
```sh
git pull origin master
git rebase master
```

Add your changes and push *your_branch*
```sh
git add .
git commit -m 'rebased master'
git push origin your_branch
```

Now submit a pull request and have someone review it (pull down your branch to their local machine, run tests, and approve it).

You're done!
