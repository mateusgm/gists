## Increasing response rate

Open and no previous engagement
```
+Talent pool:(Open to work),
+Recruiting Activity: NOT Messages AND NOT Projects,
```

## Role specific

**Data Engineer**
```
# how to filter out analytics engineers and applied DE? -> focusing on infra
+Keywords:dataops OR terraform OR ansible OR infrastructure OR kubernetes OR kafka OR flink OR distributed OR design OR scala OR cloudformation OR kinesis OR emr OR elasticsearch OR prometheus OR datadog,
+Job occupation:((Data Engineer) OR (Data Architect)),
```

**Analytics Engineer**
```
# how to filter out non engineers?
+Keywords:(airflow OR ETL) AND (python) AND NOT(power bi),
+Job title:("Business Intelligence Engineer" OR "Data Analyst"), +Job occupation:((Business Intelligence Developer),
```

**Backend Engineer**
```
# how to filter out specialists and frontend people?
+Keywords:NOT(Java OR React OR C# OR .NET OR php OR windows),
+Job title:("Back End Developer" OR "Software Engineer" OR "Senior Developer" OR "Python Developer" OR "Ruby on Rails Developer" OR "Ruby Developer" OR "Go Developer" OR "NodeJS developer"),
```

**SRE**
```
+Keywords:( devops OR sre ) AND ( kubernetes OR orchestration OR eks OR ecs OR terraform OR automation OR deployment OR dataops OR prometheus OR observability OR incidence OR SLA OR infra OR K8S OR puppet OR ansible )
```

## Seniority
```
+Total years of experience (in years):(from 3 to 20),
+Seniority:(Senior),
```