terraform {
  required_providers {
    aws = {
      version = "~> 5.84.0" # You can specify the version you need
    }
  }
}

# Define the AWS provider and region to be used for all resources
provider "aws" {
  region = var.aws_region # Region will be defined in a variable
}

# Create a VPC (Virtual Private Cloud) in the specified CIDR block
resource "aws_vpc" "aksflora_vpc" {
  cidr_block           = var.vpc_cidr # CIDR block for the VPC (e.g., "10.0.0.0/16")
  enable_dns_support   = true         # Enable DNS resolution within the VPC
  enable_dns_hostnames = true         # Enable DNS hostnames for instances within the VPC
  tags = {
    Name = "aksflora-vpc" # Tag to name the VPC
  }
}

# Create a Public Subnet within the VPC
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.aksflora_vpc.id # Associate with the VPC created above
  cidr_block              = var.public_subnet_cidr  # CIDR block for the public subnet (e.g., "10.0.1.0/24")
  availability_zone       = var.public_subnet_az    # Availability zone where the subnet will be located
  map_public_ip_on_launch = true                    # Automatically assign public IPs to instances launched in this subnet
  tags = {
    Name = "public-subnet" # Tag to name the public subnet
  }
}

# Create a Private Subnet within the VPC
resource "aws_subnet" "private_subnet" {
  vpc_id            = aws_vpc.aksflora_vpc.id # Associate with the VPC created above
  cidr_block        = var.private_subnet_cidr # CIDR block for the private subnet (e.g., "10.0.2.0/24")
  availability_zone = var.private_subnet_az   # Availability zone where the subnet will be located
  tags = {
    Name = "private-subnet" # Tag to name the private subnet
  }
}

# Create an Internet Gateway (IGW) to provide internet access to the VPC
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.aksflora_vpc.id # Associate the IGW with the VPC created above
  tags = {
    Name = "aksflora-igw" # Tag to name the Internet Gateway
  }
}

# Create a NAT Gateway to allow outbound internet traffic from private subnet instances
resource "aws_eip" "nat_eip" {
  # Allocate an Elastic IP for the NAT Gateway
}

resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_eip.id          # Associate with the Elastic IP
  subnet_id     = aws_subnet.public_subnet.id # Place the NAT Gateway in the public subnet
  tags = {
    Name = "aksflora-nat-gw" # Tag to name the NAT Gateway
  }
}

# Create a Route Table to define how traffic should flow within the VPC
resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.aksflora_vpc.id # Associate the route table with the VPC

  # Add a route to the route table for public subnet traffic
  route {
    cidr_block = "0.0.0.0/0"                # Destination address block for all external traffic
    gateway_id = aws_internet_gateway.gw.id # Route the traffic to the Internet Gateway for public subnet
  }
}

# Create a Route Table for the Private Subnet (with NAT Gateway)
resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.aksflora_vpc.id # Associate with the VPC

  # Add a route to the route table for private subnet traffic
  route {
    cidr_block     = "0.0.0.0/0"               # Destination address block for all external traffic
    nat_gateway_id = aws_nat_gateway.nat_gw.id # Route the traffic through the NAT Gateway for private subnet
  }
}

# Associate the Public Subnet with the Route Table
resource "aws_route_table_association" "public_subnet_assoc" {
  subnet_id      = aws_subnet.public_subnet.id    # Subnet to associate the route table with
  route_table_id = aws_route_table.route_table.id # The route table being associated
}

# Associate the Private Subnet with the Route Table (using NAT Gateway)
resource "aws_route_table_association" "private_subnet_assoc" {
  subnet_id      = aws_subnet.private_subnet.id           # Associate private subnet with route table
  route_table_id = aws_route_table.private_route_table.id # The route table for the private subnet
}
