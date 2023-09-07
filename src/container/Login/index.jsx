import React from 'react'
import { Cell, Input, Checkbox} from 'zarm'
import CustomIcon from '@/components/CustomIcon'
import s from './style.module.less'

const Login = () => {
    return (
        <div className={s.auth}>
            <div className={s.head}/>
            <div className={s.tab}>
                <span>注册</span>
            </div>
            <div className={s.form}>
                <Cell icon={<CustomIcon type="zhanghao" />}>
                    <Input 
                        type="text"
                        placeholder="请输入账号"
                    />
                </Cell>
                <Cell icon={<CustomIcon type="mima" />}>
                    <Input
                        type="password"
                        placeholder="请输入密码"
                    />
                </Cell>
                <Cell icon={<CustomIcon type="mima" />}>
                    <Input
                        type="text"
                        placeholder="请输入验证码"
                    />
                </Cell>
            </div>
            <div className={s.operation}>
                <div className={s.agree}>
                    <Checkbox theme='red'/>
                    <label className='text-light'>阅读并同意
                        <a 
                          href="/#"
                          onClick={(e) => {
                          e.preventDefault();
                          alert('agree it');}}
                          color='#EDA667'
                        >《吱吱记账本条款》</a></label>
                </div>
                <div className={s.Button}>
                    <button>登录</button>
                </div>
            </div>
        </div>
    )
}

export default Login
