import React from 'react';
import Api from '../../src/components/Api';
import {
    renderIntoDocument
} from 'react-addons-test-utils';
import * as chai from 'chai';
let expect = chai.expect;


describe('Api', () => {
    it('provides a collection of supported resources', () => {
        const component = renderIntoDocument(
            <Api />
        );

        expect.fail('Test not written yet');
    });

});
