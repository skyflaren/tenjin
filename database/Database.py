import http.client
import json 

conn = http.client.HTTPSConnection("twinword-language-scoring.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "twinword-language-scoring.p.rapidapi.com",
    'x-rapidapi-key': "14cdcd2acdmsh98abc0fc4ca141dp1a145bjsnff1d52d596dc"
    }

inp = open("tenjin\database\database.txt","r")
line = inp.readline()
wordData = {}

while(line!=nun):
    conn.request("GET", line, headers=headers)
    res = conn.getresponse()
    # print(os.getcwd());
    print(type(res));
    data = res.read()
    wordData[line]= res["ten_degree"] 
    print(data.decode("utf-8"))
    line = inp.readline()