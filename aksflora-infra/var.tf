variable "aws_region" {
  description = "AWS Region"
  default     = "us-east-1" # Update to US East region
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the Public Subnet"
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR block for the Private Subnet"
  default     = "10.0.2.0/24"
}

variable "public_subnet_az" {
  description = "Availability Zone for the Public Subnet"
  default     = "us-east-1a" # Change to an Availability Zone in us-east-1
}

variable "private_subnet_az" {
  description = "Availability Zone for the Private Subnet"
  default     = "us-east-1b" # Change to an Availability Zone in us-east-1
}
