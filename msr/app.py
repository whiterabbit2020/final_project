from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import requests
import json
import predict

app = Flask(__name__, static_url_path='/static')

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/whods"
# Set no-cache
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
mongo = PyMongo(app)


@app.route("/")
def index():
    db_results = mongo.db.covid_19.find({},{'_id': False})
    # covid_data = [doc for doc in db_results]
    covid_data = {}
    for doc in db_results:
        key = "".join([k for k in doc.keys()])
        covid_data[key] = doc[key]
    return render_template("index.html", covid_data=covid_data)


@app.route("/refresh")
def refresh():
    covid_19 = mongo.db.covid_19
    data = requests.get("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json")
    data_json = json.loads(data.text)
    mongo_data = [{k:v} for k,v in data_json.items()]
    covid_19.delete_many({})
    covid_19.insert_many(mongo_data)
    return redirect("/", code=302)

@app.route("/predict/<country>/<month>/<day>/<year>")
def cases_prediction(country, month, day, year):
    u_date = f'{month}/{day}/{year}'
    cases = predict.predict_cases(country=country, u_date=u_date)
    deaths = predict.predict_deaths(country=country, u_date=u_date)
    prediction = {
        "cases": cases,
        "deaths": deaths
    }
    return jsonify(prediction)


if __name__ == "__main__":
    app.run(debug=True)