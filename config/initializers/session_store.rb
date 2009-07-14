# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_anerian-site_session',
  :secret      => '0d006eb1806c4fc3b231406c4f76a70642614354d3e56193404bc9daf6892d49af6f440d67b804b4665ed41a1d23afaa2ea9bf0f2b8962359d31c081318de275'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
