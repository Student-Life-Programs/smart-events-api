<p align="center">
  <img src="https://user-images.githubusercontent.com/38381688/115948145-4e451080-a49a-11eb-8027-9db71f47618c.png" alt="SmartEvents" width="50%">
</p>
<p align="center">
  A Product of Campus Experience, Cedarville University
</p>

# SmartEvents API
The SmartEvents API is a RESTful API servicing resources to all projects inside the SmartEvents suite. Node Express server hosted in an AWS EC2 instance with a local MongoDB.

See the documentation directory to get started with using the API.

## Contributing
All projects maintained by the Creative Solutions Group are considered open source software, that is anyone is welcome and encouraged to contribute to its development.

To **contribute to a project**, the workflow is as follows:

1. Fork repository
2. Clone the fork

`git clone https://github.com/<your username>/<this repository>.git`

 3. Set upstream branch

`git remote add upstream https://github.com/CreativeSolutionsGroup/<this repository>.git`

Running `git remote -v` should show the **origin** and **upstream** branches with a fetch and branch endpoint

 4. Create feature/bug branch off master

`git checkout master`
`git checkout -b <branch name>`

5. Commit updates

`git add .`
`git commit -m "<commit message>"`

6. Push updates

`git push -u origin <branch name>`

7. Submit PR in GitHub

NOTE: You will want to periodically check for changes from the upstream branch. If changes have been made, you will want to update your remote and local master and rebase commits.

`git remote update`
`git push origin upstream`
`git checkout master`
`git pull -u origin master`
`git checkout -`
`git rebase master`
