import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'null920';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={
        <>
          {`${currentYear} ${defaultMessage}`} |{' '}
          <a target={'_blank'} href={'https://beian.miit.gov.cn/'} rel="noreferrer">
            {'鄂ICP备2023015324号'}
          </a>
          {' | '}
          <a
            target={'_blank'}
            href={'https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42088102000157'}
            rel="noreferrer"
          >
            <img
              src="https://img.qimuu.icu/typory/%E5%A4%87%E6%A1%88%E5%9B%BE%E6%A0%87.png"
              alt={'鄂公网安备42088102000157号'}
            />
            {'鄂公网安备42088102000157号'}
          </a>
        </>
      }
      links={[
        {
          key: '数字灯塔-API开放平台',
          title: '数字灯塔-API开放平台',
          href: '#',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/null920',
          blankTarget: true,
        },
        {
          key: 'null920',
          title: 'null920',
          href: 'https://github.com/null920',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
