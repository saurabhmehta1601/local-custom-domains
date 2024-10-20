# Contributing to the Project

First of all you can start by giving star to this respository so that you can easily find it later.

## Contributing workflow:
In order to contribute to this repository, follow these steps:

#### STEP 1 - Creating new Issue ( Optional )

Before creating an issue please check if similar issue already exists or not. 
If you want to work on an existing issue, please skip this step and move to the next.

The very first step of contributing is to create a `issue` in the issue section of this repository. The issue should be related to the project and should not be a duplicate one. 

#### STEP 2 - Creating new Branch

Before creating the branch make sure to follow the our branch naming convention where the branch name is -

`ISSUE_NUMBER/YOUR_GITHUB_USERNAME/BRIEF_DESCRIPTION_OF_WHAT_PULL_REQUEST_DOES`

For example `12/saurabh/update-docs` is valid branch name.

#### STEP 3 - Commiting changes

Add the desired changes by commiting them to the branch you created. For writing commit messages, we use conventional commits specification, please refer [conventional commit spec](https://www.conventionalcommits.org/en/v1.0.0/) if you are not familiar already.

#### STEP 4 - Raising a Pull Request

Once you are ready to propose the changes push your branch to GitHub and create a pull request from your branch to `develop` branch where the latest accepted changes resides.
We merge the develop branch periodically to main branch.

Also, if you have made all the changes to the pull request and the pull request is ready to be reviewed for merging than add label `review needed` to the pull request else if you plan on working on the pull request add label `work in progress`. 

#### STEP 5 - Link the Pull Request to issue

Dont forget to link your pull request to the issue.You can link pull request to the issue by writing `closes #issue_number` in the description of the pull request. To know more about linking pull requests visit [here](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue).
