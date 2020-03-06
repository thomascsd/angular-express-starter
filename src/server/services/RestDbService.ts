const Airtable = require('airtable-node');
import { Inject } from 'typedi';

@Inject()
export class RestDbService {
  async getDatas<T>(baseName: string, tableName: string, query?: any[]): Promise<T[]> {
    try {
      const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API })
        .base(baseName)
        .table(tableName);

      const { records } = await airtable.list();

      const body: T[] = records.map(o => {
        const fields = o.fields;
        fields.id = o.id;
        return fields;
      }) as T[];

      return body;
    } catch (error) {
      console.dir(error);
      throw error;
    }
  }

  async saveData<T>(tableName: string, data: T) {
    // const url = `${process.env.RESTDB_URL}${tableName}`;
    // const client = this.getGot();
    // const body = await client
    //   .post(url, {
    //     json: data
    //   })
    //   .json<T>();
    // console.log(body);
    // return body;
  }

  private getQuery(query: any[]): string {
    if (!query.length) {
      return '';
    }

    const content: string = query.reduce((acct, obj) => {
      acct += `"${obj['field']}":"${obj['value']}",`;
      return acct;
    }, '');

    return `?q={${content.substr(0, content.length - 1)}}`;
  }
}
