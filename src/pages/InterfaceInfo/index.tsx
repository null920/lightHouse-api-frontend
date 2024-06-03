import {
  getInterfaceInfoByIdUsingGet,
  invokeInterfaceInfoUsingPost,
} from '@/services/lightHouse-api-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { Badge, Button, Card, Descriptions, Divider, Empty, Form, Input, message } from 'antd';
import { FormProps } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const params = useParams();
  const [invokeLoading, setInvokeLoading] = useState(false);

  const loadData = async () => {
    if (!params.id) {
      message.error('参数错误');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * 调用接口
   * @param values
   */
  const onFinish: FormProps['onFinish'] = async (values) => {
    if (!params.id) {
      message.error('参数错误');
      return;
    }
    // 调用接口
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPost({
        id: Number(params.id),
        ...values,
      });
      message.success('请求成功');
      setInvokeRes(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setInvokeLoading(false);
    console.log('Success:', values);
  };

  return (
    <PageContainer title="接口信息">
      <Card>
        {data ? (
          <Descriptions title={data.name} bordered column={1}>
            <Descriptions.Item label="接口状态">
              {data.status === 1 ? (
                <Badge status="processing" text="正常" />
              ) : (
                <Badge status="error" text="关闭" />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="接口描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
      <Divider />
      <Card title="在线测试">
        <Form
          name="invoke"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea allowClear autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="调用结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
