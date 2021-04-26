# Deployment

Currently deployment is a manual process. The express server maps port 3000 to port 80 (standard HTTP) using [Nginx](https://github.com/CreativeSolutionsGroup/smart-events-api/master/docs/nginx.md).

1. SSH into AWS EC2 instance
2. Navigate into the `smart-events-api` directory
3. Pull in newest version of master
    - `git remote update`
    - `git pull`
    - Check status from pm2 with `pm2 ls`, status for `SmartEventsAPI` should be `online`
