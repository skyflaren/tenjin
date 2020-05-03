import http.client
import json; 

conn = http.client.HTTPSConnection("twinword-language-scoring.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "twinword-language-scoring.p.rapidapi.com",
    'x-rapidapi-key': "14cdcd2acdmsh98abc0fc4ca141dp1a145bjsnff1d52d596dc"
    }

inp = open("database.txt","r")
lin =""
while(line!=null):
    line = inp.readLine()
    conn.request("GET", inp.readLine(), headers=headers)
    res = conn.getresponse()
    print(type(res));
    data = res.read()
    print(data.decode("utf-8"))