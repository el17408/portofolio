from flask import Flask , render_template,request,redirect
import csv
app = Flask(__name__)

@app.route('/')
def my_home():
    return render_template('index.html')

@app.route('/<string:page_name>')
def another_home(page_name='index.html'):
    return render_template(page_name)   

@app.route('/submit_form', methods=['POST','GET'])
def submit_from():
    if request.method == 'POST' :
        try:
            data = request.form.to_dict()
            write_to_csv(data)
            return redirect('/thank_you.html')
        except:
            return 'Did not save to database'
    else :
        return 'Something went wrong'

def write_to_file(data):
    with open('database.txt', mode='a') as database:
        email = data['email']
        subject = data['subject']
        message = data['message'] 
        file = database.write("\n"+email+","+subject+","+message)

def write_to_csv(data):
    with open('database.csv', mode='a', newline='') as database2:
        email = data['email']
        subject = data['subject']
        message = data['message'] 
        csv_writer = csv.writer(database2,delimiter=',',quotechar='"',quoting=csv.QUOTE_MINIMAL)
        csv_writer.writerow([email,subject,message])
