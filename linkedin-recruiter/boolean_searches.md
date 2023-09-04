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

## Countries we have contract
```
+Location:(France OR Germany OR Italy OR Netherlands OR Spain OR Sweden),
```

## Countries visa takes less than 3m
```
+Location:(Algeria OR Bulgaria OR Canada OR Costa Rica OR Dubai OR Egypt OR France OR Ghana OR Japan OR Qatar OR Russia OR Serbia OR Turkey OR Ukraine OR USA),
```

## EU High standard

+Company:( "Amazon" OR "Amazon Web Services (AWS)" OR "Booking.com" OR "Databricks" OR "Datadog" OR "Dataiku" OR "Deepmind" OR "Docker" OR "Elastic" OR "Facebook" OR "FireEye" OR "Flow Traders" OR "GitLab" OR "Google" OR "Google Brain" OR "Huawei" OR "Microsoft" OR "Netflix" OR "Optiver" OR "Otrium" OR "Spotify" OR "Stripe" OR "Twitter" OR "Uber" OR "Wildlife Studios"),


## EU fintech

+Company:("Adyen" OR "Atom Bank" OR "Avaloq" OR "Banking Circle" OR "BIMA" OR "Bitstamp" OR "Checkout" OR "Curve" OR "Deposit Solutions" OR "Ebury" OR "Funding Circle" OR "Gocardless" OR "Greensill" OR "Ivalua" OR "IZettle" OR "Klarna" OR "Kreditech" OR "Ledger" OR "LendInvest" OR "MetroBank" OR "Monese" OR "Moneyfarm" OR "Monzo" OR "N26" OR "Nexi" OR "Numbrs" OR "Nutmeg" OR "Oaknorth" OR "Oodle Car Finance" OR "Pagantis" OR "PayFit" OR "Pleo" OR "Qonto" OR "Radius Payment" OR "Raisin" OR "Rapyd" OR "Ratesetter" OR "Revolut" OR "Smava" OR "solarisBank" OR "Soldo" OR "Starling Bank" OR "Sumup" OR "Tink" OR "Tinubu Square" OR "Tradeplus24" OR "Transferwise" OR "Wefox" OR "Worldremit" OR "Wynd")

## EU Unicorns


+Company:("Alan" OR "Atlassian" OR "Acronis" OR "Adyen" OR "Alan" OR "Beat" OR "Bitpanda" OR "Bitstamp" OR "Bolt" OR "Bunq" OR "Bux" OR "Cabify" OR "Careem" OR "Catawiki" OR "Celonis" OR "CircleCI" OR "Contentful" OR "Criteo" OR "Dazn" OR "Deposit Solutions" OR "eBay" OR "Epidemic Sound" OR "Exasol" OR "FareHarbor" OR "FARFETCH" OR "FlixBus" OR "Forto" OR "GetYourGuide" OR "Glovo" OR "Gorillas" OR "GoStudent" OR "Gympass" OR "HelloFresh" OR "HubSpot" OR "Ikea" OR "Klarna" OR "Lunar" OR "Mambu" OR "ManoMano" OR "MessageBird" OR "Mollie" OR "Monzo Bank" OR "N26" OR "Nexthink" OR "Nubank" OR "Omio" OR "Payfit France" OR "Payfit Deutschland" OR "Personio" OR "Plaid" OR "Pleo" OR "PPRO" OR "Printful" OR "Red Hat" OR "Revolut" OR "Rohlik.cz" OR "Scalable Capital" OR "sennder" OR "Shift" OR "Shopify" OR "Solarisbank AG" OR "Sorare" OR "Soundcloud" OR "Sportradar" OR "Starling Bank" OR "SumUp" OR "SurveyMonkey" OR "Takeaway.com" OR "TIER Mobility" OR "Tink" OR "Touchlight" OR "Tractable" OR "trivago" OR "Twilio" OR "Twitch" OR "Ubisoft" OR "Veepee" OR "Vistaprint" OR "Voodoo.io" OR "Vtex" OR "Wayfair" OR "wefox" OR "WeTransfer" OR "Wise" OR "Wolt" OR "Workday" OR "Zalando SE" OR "Zego" OR "Zendesk")


## Open to work
```
+Talent pool:(Open to work),
```

## No previous engagement
```
+Recruiting Activity: NOT Messages AND NOT Projects,
```