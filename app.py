from flask import Flask, render_template
#Bora testar flask kkk
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__': # 'debug=True' faz o site atualizar sozinho quando vc salvo o código

    app.run(debug=True)