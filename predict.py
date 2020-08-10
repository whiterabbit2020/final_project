# import all required modules
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
import datetime

def day_of_year(date_val):
    return int(date_val.strftime("%j"))

# Read the csv file into a pandas DataFrame
covid_master = pd.read_csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv')

def predict_cases(country='USA', u_date='08/10/2020'):
    covid_df = covid_master.copy()

    # Data cleanup
    covid_df = covid_df.loc[:,["iso_code","date","total_cases"]] # remove unwanted columns
    covid_df['date'] = pd.to_datetime(covid_df['date']).apply(day_of_year) # convert date to day of the year
    covid_df = covid_df.loc[(covid_df['date'] > 60) & (covid_df['date'] < 300 ), :] # filter out data from previous year
    covid_df = covid_df.loc[(covid_df['iso_code'] == country), :] # select data for selected country

    # Assign X (data) and y (target)
    X = covid_df[['date']]
    y = covid_df['total_cases'].values.reshape(-1, 1)

    # Split the data into training and testing
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

    # Create a StandardScater model and fit it to the training data
    # Transform the training and testing data using the X_scaler and y_scaler models
    X_scaler = StandardScaler().fit(X_train)
    y_scaler = StandardScaler().fit(y_train)
    X_train_scaled = X_scaler.transform(X_train)
    X_test_scaled = X_scaler.transform(X_test)
    y_train_scaled = y_scaler.transform(y_train)
    y_test_scaled = y_scaler.transform(y_test)

    # Ridge model
    ridge = Ridge(alpha=.01).fit(X_train_scaled, y_train_scaled)

    # convert date to day to year
    user_date = datetime.datetime.strptime(u_date, '%m/%d/%Y')
    user_doy = user_date.strftime("%j")
    x_new = X_scaler.transform([[user_doy]])
    y_new = ridge.predict(x_new)
    y_inversed = y_scaler.inverse_transform(y_new)
    predicted_cases = round(y_inversed[0][0])
    return predicted_cases

def predict_deaths(country='USA', u_date='08/10/2020'):
    covid_df = covid_master.copy()

    # Data cleanup
    covid_df = covid_df.loc[:,["iso_code","date","total_deaths"]] # remove unwanted columns
    covid_df['date'] = pd.to_datetime(covid_df['date']).apply(day_of_year) # convert date to day of the year
    covid_df = covid_df.loc[(covid_df['date'] > 60) & (covid_df['date'] < 300 ), :] # filter out data from previous year
    covid_df = covid_df.loc[(covid_df['iso_code'] == country), :] # select data for selected country

    # Assign X (data) and y (target)
    X = covid_df[['date']]
    y = covid_df['total_deaths'].values.reshape(-1, 1)

    # Split the data into training and testing
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

    # Create a StandardScater model and fit it to the training data
    # Transform the training and testing data using the X_scaler and y_scaler models
    X_scaler = StandardScaler().fit(X_train)
    y_scaler = StandardScaler().fit(y_train)
    X_train_scaled = X_scaler.transform(X_train)
    X_test_scaled = X_scaler.transform(X_test)
    y_train_scaled = y_scaler.transform(y_train)
    y_test_scaled = y_scaler.transform(y_test)

    # Ridge model
    ridge = Ridge(alpha=.01).fit(X_train_scaled, y_train_scaled)

    # convert date to day to year
    user_date = datetime.datetime.strptime(u_date, '%m/%d/%Y')
    user_doy = user_date.strftime("%j")
    x_new = X_scaler.transform([[user_doy]])
    y_new = ridge.predict(x_new)
    y_inversed = y_scaler.inverse_transform(y_new)
    predicted_deaths = round(y_inversed[0][0])
    return predicted_deaths