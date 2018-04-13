import {expect} from 'chai';
import sinon from 'sinon';
import bl from 'bl';

import fetch from '../../../src/test/fetch';
import request from '../../../src/request';
import next from '../../../src/next';
import send from '../../../src/send';

describe('test/fetch', () => {
  it('should emulate `req.getHeader`', () => {
    return fetch(request((req, res) => {
      res.end(req.getHeader('foo'));
      return next;
    }), '/', {headers: {foo: 'bar'}}).then((res) => {
      expect(res.body).to.equal('bar');
    });
  });
  it('should emulate `res.writeHead` 1-arg', () => {
    return fetch(request((req, res) => {
      res.writeHead(202);
      return next;
    }), '/').then((res) => {
      expect(res.statusCode).to.equal(202);
    });
  });
  it('should emulate `res.removeHeader', () => {
    return fetch(request((req, res) => {
      res.headers.foo = 'bar';
      res.removeHeader('foo');
      return next;
    }), '/').then((res) => {
      expect(res.headers.foo).to.be.undefined;
    });
  });
  it('should emulate `res.writeHead` 2-arg', () => {
    return fetch(request((req, res) => {
      res.writeHead(202, {foo: 'bar'});
      return next;
    }), '/').then((res) => {
      expect(res.statusCode).to.equal(202);
      expect(res.headers.foo).to.equal('bar');
    });
  });
  it('should emulate `res.writeHead` 3-arg', () => {
    return fetch(request((req, res) => {
      res.writeHead(202, 'test', {foo: 'bar'});
      return next;
    }), '/').then((res) => {
      expect(res.statusCode).to.equal(202);
      expect(res.statusMessage).to.equal('test');
      expect(res.headers.foo).to.equal('bar');
    });
  });
  it('should support req string bodies', () => {
    return fetch(request((req) => {
      return new Promise((resolve, reject) => {
        req.pipe(bl((err, data) => {
          err ? reject(err) : resolve(send(data.toString('utf8')));
        }));
      });
    }), '/', {body: 'hello'}).then((res) => {
      expect(res.body).to.equal('hello');
    });
  });
  it('should support req buffer bodies', () => {
    return fetch(request((req) => {
      return new Promise((resolve, reject) => {
        req.pipe(bl((err, data) => {
          err ? reject(err) : resolve(send(data.toString('utf8')));
        }));
      });
    }), '/', {body: new Buffer('hello')}).then((res) => {
      expect(res.body).to.equal('hello');
    });
  });
  it('should have empty req body by default', () => {
    return fetch(request((req) => {
      expect(req.read()).to.equal(null);
      return next;
    }), '/');
  });
  it('should preserve the req body', () => {
    return fetch(request((req) => {
      expect(req.read(1).toString('utf8')).to.equal('a');
      expect(req.read(1).toString('utf8')).to.equal('b');
      return next;
    }), '/', {body: bl('ab')});
  });
  it('should support req stream bodies', () => {
    return fetch(request((req) => {
      return new Promise((resolve, reject) => {
        req.pipe(bl((err, data) => {
          err ? reject(err) : resolve(send(data.toString('utf8')));
        }));
      });
    }), '/', {body: bl('hello')}).then((res) => {
      expect(res.body).to.equal('hello');
    });
  });

  it('should support req `once`', () => {
    return fetch(request((req) => {
      const result = new Promise((resolve) => {
        req.once('foo', () => resolve(next));
      });
      req.body.emit('foo');
      return result;
    }), '/');
  });

  it('should support req `on`', () => {
    return fetch(request((req) => {
      const result = new Promise((resolve) => {
        req.on('foo', () => resolve(next));
      });
      req.body.emit('foo');
      return result;
    }), '/');
  });

  // TODO: Make this better.
  it('should provide default app handlers', () => {
    fetch((app) => {
      app.close();
      app.upgrade();
      app.listening();
      return app;
    }, '/');
  });
  it('should support `onNext`', () => {
    const spy = sinon.spy();
    return fetch(next, '/', {onNext: spy}).then(() => {
      expect(spy).to.be.called;
    });
  });
  it('should support `onError`', () => {
    const spy = sinon.spy();
    return fetch(request(() => {
      throw new Error();
    }), '/', {onError: spy}).then(() => {
      expect(spy).to.be.called;
    });
  });
  it('should bubble res stream errors', () => {
    const piper = bl('pipe');
    return fetch(request((req, res) => {
      piper.pipe(res);
      piper.emit('error', new Error('fail'));
      return next;
    }), '/', {onError: next}).catch((error) => {
      expect(error).to.be.an.instanceof(Error);
    });
  });
});
