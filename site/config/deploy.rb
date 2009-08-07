set :application, "anerian"
set :repository,  "git@github.com:anerian/anerian.git"

# If you have previously been relying upon the code to start, stop 
# and restart your mongrel application, or if you rely on the database
# migration code, please uncomment the lines you require below

# If you are deploying a rails app you probably need these:

# load 'ext/rails-database-migrations.rb'
# load 'ext/rails-shared-directories.rb'

# There are also new utility libaries shipped with the core these 
# include the following, please see individual files for more
# documentation, or run `cap -vT` with the following lines commented
# out to see what they make available.

# load 'ext/spinner.rb'              # Designed for use with script/spin
# load 'ext/passenger-mod-rails.rb'  # Restart task for use with mod_rails
# load 'ext/web-disable-enable.rb'   # Gives you web:disable and web:enable

# If you aren't deploying to /u/apps/#{application} on the target
# servers (which is the default), you can specify the actual location
# via the :deploy_to variable:
set :deploy_to, "/var/www/apps/#{application}"
set :use_sudo, false
set :tmpdir_remote, "/var/www/apps/#{application}/tmp/"
set :tmpdir_local, File.join(File.dirname(__FILE__),'..','tmp')

# If you aren't using Subversion to manage your source code, specify
# your SCM below:
# set :scm, :subversion
default_run_options[:pty] = true
ssh_options[:forward_agent] = true
#set :branch, "origin/master"
set :branch, "master"
set :scm, :git
set :scm_passphrase, "deployer-deployer"
set :user, "deployer"
set :port, 222
set :deploy_via, :remote_cache
set :git_shallow_clone, 1
set :git_enable_submodules, 1
# see a full list by running "gem contents capistrano | grep 'scm/'"
set :keep_releases, 5
after "deploy:update", "deploy:cleanup"

role :web, "slice5"
role :app, "slice5"

namespace :deploy do
  task :start, :roles => [:web, :app] do
    run "cd #{deploy_to}/current/site && nohup /usr/bin/thin -C config/thin.yml -R rack.ru start"
  end
 
  task :stop, :roles => [:web, :app] do
    run "cd #{deploy_to}/current/site && nohup /usr/bin/thin -C config/thin.yml -R rack.ru stop"
  end
 
  task :restart, :roles => [:web, :app] do
    deploy.stop
    deploy.start
  end
 
  # This will make sure that Capistrano doesn't try to run rake:migrate (this is not a Rails project!)
  task :cold do
    deploy.update
    deploy.start
  end
end
