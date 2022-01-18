resource "azurerm_resource_group" "oas_unblock_luis" {
  name     = "${var.resource_group_name}"
  location = "${var.location}"
}

#LUIS
resource "azurerm_cognitive_account" "luis_oas_unblock" {
  name                = "${var.luis_instance_name}"
  location            = azurerm_resource_group.oas_unblock_luis.location
  resource_group_name = "${var.resource_group_name}"
  kind                = "LUIS"

  sku_name = var.luis_sku_name
  tags = {
"Environment" = "Dev"
"CostCenter" = "ML/AI"
}
}

resource "azurerm_cognitive_account" "luis_authoring_oas_unblock" {
  name                = "${var.luis_authoring_instance_name}"
  location            = azurerm_resource_group.oas_unblock_luis.location
  resource_group_name = "${var.resource_group_name}"
  kind                = "LUIS.Authoring"
  #Authoring only has one SKU tier
  sku_name = "F0"
}