import React , {useState, useCallback, useRef}from 'react'
import { Cell, Input, Checkbox, Toast} from 'zarm'
import Captcha from "react-captcha-code"
import CustomIcon from '@/components/CustomIcon'
import s from './style.module.less'
import cx from 'classnames'
import { post } from '@/utils'

const Login = () => {
    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [verify, setVerify] = useState(''); // 验证码
    const [captcha, setCaptcha] = useState(''); // 验证码
    const [type, setType] = useState('login'); // 登录注册类型
    const captchaRef = useRef()

    // 验证码
    const handleChange = useCallback((captcha) => {
       setCaptcha(captcha)
    }, [])

    const onSubmit = async () => {
        if (!username) {
            Toast.show('请输入账号');
            return;
        }
        if (!password) {
            Toast.show('请输入密码');
            return;
        }
        try {
            if(type == 'login'){
                const res = await post('/api/user/login', {
                    username,
                    password,
                });
                Toast.show('登录成功');
                console.log(res);
                // token
                localStorage.setItem('token', res.data.token);
            }else {
                if (!verify) {
                    Toast.show('请输入验证码');
                    return;
                }
                if (verify !== captcha) {
                    Toast.show('验证码错误');
                    return;
                }
                const res = await post('/api/user/register', {
                    username,
                    password,
                });
                Toast.show('登录成功');
                console.log(res);
                // 注册成功，切换回登录
                setType('login');
            }
            
        } catch (err) {
            console.log(err);
            Toast.show('登录失败');
        }
        
    }

    return (
        <div className={s.auth}>
            <div className={s.head}/>
            <div className={s.tab}>
                <span className={cx({[s.active]: type == 'login'})} onClick={()=>setType('login')}>登录</span>
                <span className={cx({[s.active]: type == 'register'})} onClick={()=>setType('register')}>注册</span> 
            </div>
            <div className={s.form}>
                <Cell icon={<CustomIcon type="zhanghao" />}>
                    <Input 
                        clearable
                        type="text"
                        placeholder="请输入账号"
                        onChange={(value) => setUsername(value)}
                    />
                </Cell>
                <Cell icon={<CustomIcon type="mima" />}>
                    <Input
                        clearable
                        type="password"
                        placeholder="请输入密码"
                        onChange={(value) => setPassword(value)}
                    />
                </Cell>
                { type === 'register' ?
                <Cell icon={<CustomIcon type="mima" />}>
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入验证码"
                        onChange={(value) => setVerify(value)}
                    />
                    <Captcha ref={captchaRef} charNum={4}  onChange={handleChange}/>
                </Cell> : null
                }   
            </div>
            <div className={s.operation}>
                {type === 'register' ? 
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
                </div>  : null
                }
                <div className={s.Button}>
                    <button onClick={onSubmit} >{type == 'login' ? '登录' : '注册'}</button>
                </div>
            </div>
        </div>
    )
}

export default Login
