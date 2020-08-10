

## Project for data visualization from World Health Oranization (__*WHO*__) source.

### Story
* Data available on WHO site needs proper graphical representation, in order to gather the situation _**static**_ and _**dynamic**_ for data visualization


Present graphial representation  of WHO data related to COVID-19 vs  Influenza - similarities and differences.

Both cause respiratory diseases and there are important differences between two viruses and how they spread.


### Data set:

https://www.who.int/data/gho/info/athena-api 

https://covid19.who.int/ 

[reference to graphs](https://ourworldindata.org/coronavirus-data-explorer?yScale=log&zoomToSelection=true&testsMetric=true&totalFreq=true&aligned=true&perCapita=true&smoothing=0&country=ATG~ARG~AFG~Africa~ALB&pickerMetric=location&pickerSort=asc)

### inspiration

Current world health and socio-ecomonic scenario drives lot of us to evaluate/correlate and finding patterns across the globe, that could be leveraged for now and in the future to handle the situation effectively. 


* number of fatalities with covid v/s without covid - Siraj
* fatalities with covid v/s top non covid. - Alan
* fatalities rate over time, related to covid. - Atul
* fatalities over geographical location - Chad/Siraj
* fatalities v/s age group - Ganga/
* fatalities v/s poverty. Atul/Alan


### Highlevel Steps

* mongo/mysql DB
* library/reuse code/may be OO
* graphical represntation 
* final presentation 

### Development steps

* Presentation - Chad

* MangoDB / Flask - Siraj
    - Load Json files into MongoDB database - done 
    - Create Flask app - python
    - Data injection
    
  Frontend -- Alan, Atul, Ganga
    * HTML page (bootstrap) 
    * Java script
    * Static page + js

GUI Output:
* Project info  + description 
* 3 graphs - interative / 3 tabs
    - Time vs Death rate per million ( x = date, y = death rate )
    - Time vs Number of cases per million ( x = date, y = cases per million )
    - Time v/s stringency 
    - Pre existing condition vs Death rate
     ????  vs ????

* Conclution
