terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "supply_chain_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "supply-chain-vpc"
  }
}

resource "aws_eks_cluster" "supply_chain_cluster" {
  name     = "supply-chain-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.private_subnet_1.id,
      aws_subnet.private_subnet_2.id,
    ]
  }
}

resource "aws_db_instance" "supply_chain_db" {
  identifier = "supply-chain-db"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.t3.micro"
  
  allocated_storage = 20
  
  db_name  = "supply_chain"
  username = var.db_username
  password = var.db_password
  
  skip_final_snapshot = true
  
  tags = {
    Name = "supply-chain-database"
  }
}