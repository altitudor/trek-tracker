require "spec_helper"

RSpec.describe Trail, type: :model do
  it { should have_valid(:name).when("Trail1") }
  it { should_not have_valid(:name).when(nil, "") }
end
