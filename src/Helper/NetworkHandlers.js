import {outLog} from './Logger';

export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

class AuthenticationBuilder {
  constructor(token = null) {
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
      'x-access-token': token,
    };
  }
}

class BodyBuilder extends AuthenticationBuilder {
  constructor(body = null, token = null) {
    super(token);
    this.options = {
      headers: this.headers,
      body: body !== null ? JSON.stringify(body) : null,
    };
  }
}

class MethodBuilder extends BodyBuilder {
  constructor(body = null, token = null, method) {
    super(body, token);
    this.options = {...this.options, method: method};
  }
}

class BuildOptions extends MethodBuilder {
  constructor(body = null, token = null, method) {
    super(body, token, method);
    this.options = this.options;
  }
}

class RequestBuilder extends BuildOptions {
  constructor({url, method, token = null, body = null}) {
    super(body, token, method);
    this.request = {
      url: url,
      options: this.options,
    };
  }
  async sendRequest() {
    const promise = await new Promise(async (resolve, reject) => {
      return fetch(this.request.url, this.options)
        .then(res =>
          res
            .json()
            .then(data => resolve({res, data, message: 'success'}))
            .catch(e => {
              resolve({res, data: null, message: `failed: ${e}`});
            }),
        )
        .catch(e => {
          resolve({res: {status: null}, data: null, message: `failed: ${e}`});
        });
    });
    return new ResponseBuilder({
      request: this.request,
      response: {
        body: promise.res,
        data: promise.data,
      },
      status: {
        error: promise.res.status !== 200,
        message: promise.message,
        code: promise.res.status,
      },
    });
  }
  showRequest() {
    console.log('\n\n---------------------REQUEST----------------------------');
    console.log(JSON.stringify(this.request, null, 2));
    console.log('---------------------REQUEST-END------------------------\n\n');
  }
}

class ResponseBuilder {
  constructor({
    request = {url: null, options: null},
    response = {body: null, data: null},
    status = {error: null, message: null, code: null},
  }) {
    this.request = {
      url: request.url,
      options: request.options,
    };
    this.response = {body: response.body, data: response.data};
    this.status = {
      error: status.error,
      message: status.message,
      code: status.code,
    };
  }
  showMessage() {
    outLog.green(`🚀 SUCCESSFUL ~GET ${this.request.url}`);
  }
  cacheMessage(message) {
    outLog.magenta(`🚀 SUCCESSFUL ~Cached from ${message}`);
  }
}

export {RequestBuilder, ResponseBuilder};
