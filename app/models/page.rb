class Page < ActiveRecord::Base
  has_many :slots
  has_many :contents, :through => :slots
end
