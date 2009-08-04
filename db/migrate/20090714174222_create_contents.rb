class CreateContents < ActiveRecord::Migration
  def self.up
    create_table :contents do |t|
      t.text :body
      t.string :name
      t.string :caption
      t.timestamps
    end

    create_table :slots do |t|
      t.integer :content_id, :null => false
      t.integer :slottable_id, :null => false
      t.string  :slottable_type, :null => false
      t.integer :placement, :default => 0
      t.string  :name, :default => '', :null => false
    end

    add_index :slots, [:slottable_id, :content_id]
  end

  def self.down
    drop_table :contents
  end
end
