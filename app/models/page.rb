class Page < ActiveRecord::Base
  belongs_to :template
  has_many :slots, :as => :slottable
  has_many :contents, :through => :slots
end
