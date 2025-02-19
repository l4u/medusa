const {
  Region,
  ShippingProfile,
  ShippingOption,
  ShippingOptionRequirement,
} = require("@medusajs/medusa")

module.exports = async (connection, data = {}) => {
  const manager = connection.manager

  await manager.insert(Region, {
    id: "region",
    name: "Test Region",
    currency_code: "usd",
    tax_rate: 0,
  })

  const defaultProfile = await manager.findOne(ShippingProfile, {
    type: "default",
  })

  await manager.insert(ShippingOption, {
    id: "test-out",
    name: "Test out",
    profile_id: defaultProfile.id,
    region_id: "region",
    provider_id: "test-ful",
    data: {},
    price_type: "flat_rate",
    amount: 2000,
    is_return: false,
  })

  await manager.insert(ShippingOption, {
    id: "test-option-req",
    name: "With req",
    profile_id: defaultProfile.id,
    region_id: "region",
    provider_id: "test-ful",
    data: {},
    price_type: "flat_rate",
    amount: 2000,
    is_return: false,
  })

  await manager.insert(ShippingOptionRequirement, {
    id: "option-req",
    shipping_option_id: "test-option-req",
    type: "min_subtotal",
    amount: 5,
  })

  await manager.insert(ShippingOptionRequirement, {
    id: "option-req-2",
    shipping_option_id: "test-option-req",
    type: "max_subtotal",
    amount: 10,
  })
}
