import http.client
import json; 

conn = http.client.HTTPSConnection("twinword-language-scoring.p.rapidapi.com")

headers = {
    'x-rapidapi-host': "twinword-language-scoring.p.rapidapi.com",
    'x-rapidapi-key': "14cdcd2acdmsh98abc0fc4ca141dp1a145bjsnff1d52d596dc"
    }
in = open("database.txt","r")

for()
conn.request("GET", "green", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))