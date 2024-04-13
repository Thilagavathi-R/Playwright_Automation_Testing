// import { DriverFactory } from './DriverFactory'; // Adjust the import based on your project structure
import * as sql from 'mssql';
import { ConnectionPool, Request } from 'mssql';
import { fixture } from '../../test/hooks/Pagefixture';


export default class DataBaseConnection {
  
  public static pool: ConnectionPool;
  public static stmt: Request;

  // static stmt: sql.Request;
  static AWM_Stm: sql.Request;
  static DB_Url: string;
  static DB_User: string;
  static DB_Pwd: string;
  static con: sql.ConnectionPool;
  static results: sql.IResult<any>;
  static finalResult: string;
  static requestNumber: string;
  static username: string;
  static Bill_Deduction_Updated: string;
  static WONumber: string;
  static Bill_Invoice_Number: string;
  static Scrutiny_Invoice_Number: string;
  static GIN_Invoice_Number: string;
  static Invoice_reg_No: string;
  static User_Name_Invoice: string;
  static LinkID: string;
  static DScode: string;
  static DSFullcode: string;
  static Link: string;
  static FIN: string;
  static Date: string;
  static Bill: string;
  static stmt1: sql.Request;
  static fas: sql.Request;
  static Purchase_Order_Number: string;
  static Purchase_Order_Number_Create: string;
  static Work_Order_Number: string;
  static MRN: string;
  static Vendor_code: string;
  static BPB_Doc_Number: string;
  static Rule_ID: string;
  static Team_ID: string;
  static conn: string;
  static rs: string;
  static COS: string;
  static paid: string;
  static data: string;
  // static stmt2: Statement;

  static async executeQuery(sqlQuery: string): Promise<any> {
    const request = new Request(this.pool);
    return request.query(sqlQuery);
  }

  static async dataBaseConnectionAMS(): Promise<void> {
    try {
      this.DB_Url =
        'jdbc:sqlserver://172.31.61.105:1433;databaseName=EIP40WMS;encrypt=true;trustServerCertificate=true;';
      this.DB_User = 'WMS4LOGIN';
      this.DB_Pwd = 'WMS!LogiN#qa';

      const config: sql.config = {
        user: this.DB_User,
        password: this.DB_Pwd,
        server: '172.31.61.105',
        database: 'EIP40WMS',
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      };     
          

      this.con = await sql.connect(config);
      this.stmt = new sql.Request(this.con);
      console.log('Data Base Connection success');
    } catch (error) {
      console.error(error);
    }
  }

  static async dataBaseConnectionTravels(): Promise<void> {
    try {
      this.DB_Url =
        'jdbc:sqlserver://172.31.61.105:1433;databaseName=EIP40WMS;encrypt=true;trustServerCertificate=true;';
      this.DB_User = 'EIP20LOGIN';
      this.DB_Pwd = 'QA@#eip20Login';

      const config: sql.config = {
        user: this.DB_User,
        password: this.DB_Pwd,
        server: '172.31.61.105',
        database: 'Travels',
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      }; 
        this.con = await sql.connect(config);
        this.stmt = new sql.Request(this.con);
        console.log('Data Base Connection success');
      } catch (error) {
        console.error(error);
      }
    }

    static async dataBaseConnectionFAS(): Promise<void> {
      try {
        this.DB_Url =
          'jdbc:sqlserver://172.31.61.105:1433;databaseName=EIP40WMS;encrypt=true;trustServerCertificate=true;';
        this.DB_User = 'FIN4LOGIN';
        this.DB_Pwd = 'FIN4LOGIN@@qa';
  
        const config: sql.config = {
          user: this.DB_User,
          password: this.DB_Pwd,
          server: '172.31.61.105',
          database: 'EIP40FIN',
          options: {
            encrypt: true,
            trustServerCertificate: true,
          },
        }; 
          this.con = await sql.connect(config);
          this.stmt = new sql.Request(this.con);
          console.log('Data Base Connection success');
        } catch (error) {
          console.error(error);
        }
      }

  // static async databaseConnectionClose(): Promise<void> {
  //   await this.con.close()
  // }

  static async resultSet(documentType: string): Promise<void> {
    try {
        if (documentType === 'LinkOrder') {
          this.results = await this.stmt.query(
            'select top 1 HVF_VFS_Number from EIP40FIN.TRE.TRE_H_Vendor_Finance order by HVF_Inserted_On desc'
          );
        } else if (documentType === 'Export') {
          this.results = await this.stmt.query(
            'select top 1 DVF_VFS_Link_Number from EIP40FIN.TRE.TRE_D_Vendor_Finance where DVF_DT_Code = 30164 order by DVF_Updated_On desc'
          );
        } 
  
        for (const row of this.results.recordset) {
          this.requestNumber = row[1];
          console.log(`Document Reference Number : ${this.requestNumber}`);
  
          const results1 = await this.AWM_Stm.query(
            `SELECT top 1 MUSER_Login_Name FROM EIP40AWM.WFM.WFM_T_Document_Flow INNER JOIN EIP40AWM.ACS.ACS_M_Users ON MUSER_USER_ID=TDF_RECEIVER_UID WHERE TDF_Document_Reference_No = '${this.requestNumber}' and TDF_ISActive = 'Y'`
          );
  
          for (const row1 of results1.recordset) {
            this.username = row1['MUSER_Login_Name'];
            console.error(this.username);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        // await this.databaseConnectionClose();
      }
  }

  static async approver(documentType: string): Promise<void> {
    console.log('Approver Document  : ' + documentType);
    await DataBaseConnection.dataBaseConnectionAMS();
    await this.resultSet(documentType);
    console.log(this.username);
    
    console.log('');
    // this.databaseConnectionClose();
  }

  static async TravelTable(): Promise<void> {

    DataBaseConnection.dataBaseConnectionFAS();
    await fixture.page.waitForTimeout(3000);
    try {

      const executeQuery = await DataBaseConnection.executeQuery(
        "select top 1 * from EIP40FIN.ACP.FAS_H_Document_Deviation\n" +
          "inner join eip40fin.acp.FAS_D_Document_Deviation on HFDD_Reference_Document_Number = DFDD_Reference_Document_Number\n" +
          "order by DFDD_Inserted_On desc"
      );
      const rsmd = executeQuery.getMetaData();
    const columnNumber = rsmd.getColumnCount();
  
    while (executeQuery.next()) {
      for (let i = 1; i <= columnNumber; i++) {
        if (i > 0) {
          const columnValue = executeQuery.getString(i);
          console.log(`rsmd.getColumnName(i)} :  columnValue`);
        }
      }
    }
      
    } catch (error) {
      console.log('');
    }

  }
  static async DScodeFullFormExport(): Promise<void> {
     this.dataBaseConnectionFAS()// Assuming dataBaseConnectionFAS is an asynchronous function

    try {
        const results5 = await DataBaseConnection.executeQuery
        ("select MDOCS_DS_Code,MDOCS_Description  from EIP40FIN.COM.GEN_M_Document_Status where MDOCS_DT_Code ='30164'");

        while (results5.next()) {
            const DScode: string = results5.getString(1);
            const DSFullcode: string = results5.getString(2);
            console.log( DScode + ':' + DSFullcode);
        }
    } catch (error) {
        // Handle the error here
        console.error(error);
    } finally {
        // await this.databaseConnectionClose()
        console.log("");
    }
}

/*static async Invoice_Deviation_Advance_Search(): Promise<void> {
  const results7 = await stmt.executeQueryAsync(
      "select top 1 HFDD_Reference_Document_Number from EIP40FIN.ACP.FAS_H_Document_Deviation where HFDD_DS_Code in (1) order by HFDD_Inserted_On desc"
  );

  while (results7.next()) {
      const FIN: string = results7.getString(1);
      console.log(FIN);
  }

  await this.databaseConnectionClose();
}*/


}