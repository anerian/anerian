class Content < ActiveRecord::Base
  has_many :slots
  has_many :pages, :through => :slots
end
