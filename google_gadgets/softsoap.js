//var ConnString ="Provider=SQLOLEDB;Data Source=DYCNI;Integrated Security=SSPI;Initial Catalog=master;User ID=sa;Password=123;";
var ConnString ="Provider=SQLOLEDB;Data Source=DYCNI;Integrated Security=SSPI;Initial Catalog=dycni;User ID=sa;Password=123;";

 

function FetchRecord(){
try
{
    var counter=0; 
    var ConProv = new ActiveXObject("ADODB.Connection");
    ConProv.Open(ConnString);
    var RecSet = new ActiveXObject("ADODB.Recordset");
    //var SqlSt = "select * from PlayerTable";

    var SqlSt = "SELECT * FROM tmp_inverter";


    var str="<table border='2'><tr><td><b>PlayerID</b></td><td><b>PlayerName</b></td><td><b>BelongsTo</b></td><td><b>MatchPlayed</b></td><td><b>RunsMade</b></td><td><b>WicketTaken<b/></td><td><b>FeePerMatch</b></td></tr>";
    RecSet.Open(SqlSt, ConProv);
    while(!RecSet.eof) //Fetches till the end of file has reached
    {
        //Alternate row color logic
        if(counter % 2 == 0)
        {
            str +="<tr>";
            for (var i = 0; i < 19; i++)
              str +="<td style='background:orange'>" + RecSet(i) +"</td>";
            str +="</tr>";
        }
        else
        {
            str +="<tr>";
            for (var i = 0; i < 19; i++)
              str +="<td style='background:yellow'>" + RecSet(i) +"</td>";
            str +="</tr>";
        }
        RecSet.MoveNext();
        counter++;
    }
    str +="</table>"; 
    document.getElementById('divDispRecord').innerHTML = str;
    RecSet.Close();
    ConProv.Close(); 
}
catch(err)
{
    txt="Error description: " + err.description; 
    alert(txt);
} 
}
//Insert the record into the database
function InsertRecord(){
try
{ 
    var ConProv = new ActiveXObject("ADODB.Connection");
    ConProv.Open(ConnString); 
    var SqlSt = "Insert Into PlayerTable(PlayerName,BelongsTo,MatchPlayed,RunsMade,WicketsTaken,FeePerMatch) Values('New Player','Argentina',10,100,12,1234)"; 
    ConProv.Execute(SqlSt, ConProv);
    alert("Record Inserted Successfully");
    ConProv.Close(); 
}
catch(err)
{
    txt="Error description: " + err.description; 
    alert(txt);
}
}
//Update the record into the database
function UpdateRecord(){
try
{ 
    var ConProv = new ActiveXObject("ADODB.Connection"); 
    ConProv.Open(ConnString); 
    var SqlSt = "Update PlayerTable Set PlayerName='Update Name' Where PlayerId=1"; 
    ConProv.Execute(SqlSt, ConProv);
    alert("Record Updated Successfully");
    ConProv.Close(); 
}
catch(err)
{
    txt="Error description: " + err.description; 
    alert(txt);
}
}
//Delete the record into the database
function DeleteRecord(){
try
{ 
    var ConProv = new ActiveXObject("ADODB.Connection"); 
    ConProv.Open(ConnString); 
    var SqlSt = "Delete From PlayerTable Where PlayerId = 1"; 
    ConProv.Execute(SqlSt, ConProv);
    alert("Record Deleted Successfully");
    ConProv.Close(); 
}
catch(err)
{
    txt="Error description: " + err.description;
    alert(txt);
}
}