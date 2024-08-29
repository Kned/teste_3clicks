class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true
  validates :cpf, presence: true
  has_many :addresses, dependent: :destroy

  accepts_nested_attributes_for :addresses,
                                allow_destroy: true, reject_if: proc { |attribute| attribute[:body].blank? }
end
