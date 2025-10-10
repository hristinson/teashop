class InitSchema < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :role

      t.timestamps
    end

    create_table :items do |t|
      t.string :name
      t.text :description
      t.decimal :price, precision: 10, scale: 2

      t.timestamps
    end

    create_table :orders do |t|
      t.references :user, foreign_key: true
      t.decimal :amount, precision: 10, scale: 2

      t.timestamps
    end

    create_table :orders_descriptions do |t|
      t.references :order, foreign_key: true
      t.references :item, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
