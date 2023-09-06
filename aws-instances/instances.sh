#!/bin/bash

ec2() {    
  aws-vault exec app-$1-vault -- aws ec2 describe-instances | python3 ec2.py
}

rds() {
  aws-vault exec app-$1-vault -- aws rds describe-db-instances --query "DBInstances[].[[ DBInstanceClass, DBInstanceIdentifier, MultiAZ]]" --output text
}

rm -f instances.*.txt
for i in dev stg prd; do
    echo $i
    ec2 $i | awk -v a=$i -F"\t" '{ print $1"\t"a"\t"$2"\t"$3 }' >> instances.ec2.txt
    rds $i | awk -v a=$i '{ print a"\t"$0 }' >> instances.rds.txt
done