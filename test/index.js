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
    parseCodeContext(context, function(err, obj) {
      obj.should.be.an.instanceOf(Object).and.have.lengthOf(7);
      done();
    });
  });
  it('should parse only 7th line of content, returns object with length 1', function(done) {
    parseCodeContext(context, 6, function(err, obj) {

      obj.should.be.an.Array.and.have.lengthOf(1);
      obj = obj[0];
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
});
