package database;
 import java.io.*;
public class Database {
    public static void main(String args[]) throws IOException{
        BufferedReader input = new BufferedReader(new FileReader("holder.txt")); 
        PrintWriter wr = new PrintWriter(new FileWriter("cleanSheet.txt"));

        String [] words = input.readLine().split(","); 
        for(int i=0; i<words.length; i++){
            String [] h=words [i].split(":");
            wr.println(h[0].substring(1,h[0].length()-1)+": obj."+h[0].substring(1,h[0].length()-1)+",");
        }

        wr.close();

        
    }
}