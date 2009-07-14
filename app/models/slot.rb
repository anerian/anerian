class Slot < ActiveRecord::Base
  belongs_to :page
  belongs_to :content
end
