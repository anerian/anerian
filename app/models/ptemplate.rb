# the template model defines the slots
# a template can have some default content in it's slots
#
class Ptemplate < ActiveRecord::Base
  has_many :slots, :as => :slottable
  has_many :contents, :through => :slots
  serialize :grid # the cached template structure
end
