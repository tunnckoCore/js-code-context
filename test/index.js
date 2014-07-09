/*!
 * js-code-context <https://github.com/tunnckoCore/js-code-context>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */
'use strict';

var fs = require('fs');
var parseCodeContext = require('../index');
var context = fs.readFileSync('./test/fixture.js','utf-8');

describe('js-code-context', function () {
  it('should parse full content, line by line, returns object with length 7', function(done) {
    parseCodeContext(context, function(err, arr) {
      arr.should.be.an.Array.and.have.lengthOf(7);
      done();
    });
  });
  it('should parse only 7th line of content, returns object with length 1', function(done) {
    parseCodeContext(context, 6, function(err, arr) {

      arr.should.be.an.Array.and.have.lengthOf(1);
      var obj = arr[0];
      obj.should.be.an.Object;
      obj.should.be.an.instanceOf(Object);
      obj.should.have.property('type','function');
      obj.should.have.property('name','funcExpression');
      obj.should.have.property('string','funcExpression');
      obj.should.have.property('args','arg');
      obj.should.have.property('clean','funcExpression()');
      obj.should.have.property('full','funcExpression(arg)');
      done();
    });
  });
  it('should be sync', function(done) {
    var arr = parseCodeContext.sync(context, 6);
    arr.should.be.an.Array.and.have.lengthOf(1);
    done();
  });
});
