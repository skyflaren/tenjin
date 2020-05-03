import http.client
import json 

conn = http.client.HTTPSConnection("twinword-language-scoring.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "twinword-language-scoring.p.rapidapi.com",
    'x-rapidapi-key': "14cdcd2acdmsh98abc0fc4ca141dp1a145bjsnff1d52d596dc"
    }

print(1)
print(os.getcwd());
inp = open("database.txt","r")
line =""

while(line!=null):
    line = inp.readLine()
    conn.request("GET", line, headers=headers)
    res = conn.getresponse()
    print(os.getcwd());
    print(type(res));
    data = res.read()
    print(data.decode("utf-8"))