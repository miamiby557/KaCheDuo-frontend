import React, {Fragment, PureComponent} from 'react';
import {Popover} from 'antd';
import Block from './Block';
import lodash from 'lodash';

class AddressInfo extends PureComponent {
    render() {
        const {
            name,
            province = '',
            city = '',
            area = '',
            street = '',
            company = '',
            fullAddress = '',
            contactMan,
            contactPhone
        } = this.props;
        const text = lodash.join([province, city, area], '');
        const label = name || contactMan;
        const popLabel = province + " " + city + " " + area;
        const content = (
            <Fragment>
                <Block type="primary">{label}</Block>
                <div>区域：{text}</div>
                {street && <div>街道：{street}</div>}
                <div>地址：{fullAddress}</div>
                {company && <div>单位：{company}</div>}
                <div>
                    联系人：{contactMan} 电话：{contactPhone}
                </div>
            </Fragment>
        );

        return (
            <Popover content={content} placement="right">
                <span>{popLabel}</span>
            </Popover>
        );
    }
};

export default AddressInfo;
