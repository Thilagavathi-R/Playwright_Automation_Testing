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


}
