class CreateTemplates < ActiveRecord::Migration
  def self.up
    create_table :ptemplates do |t|
      t.string :name
      t.string :grid
      t.timestamps
    end
  end

  def self.down
    drop_table :ptemplates
  end
end
