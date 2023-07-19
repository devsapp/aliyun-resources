S_BIN=/Users/songluo/work/Serverless-Devs/bin/s

build-transformer:
	cd ros_transformer && npm run build && cd -

test-transformer:
	cd ros_transformer/examples && ${S_BIN} deploy && cd - 

build-all:
	cd aliyun_base && npm run build && cd -
	cd aliyun_oss_bucket && npm run build && cd -
	cd aliyun_ots_instance && npm run build && cd -
	cd aliyun_ots_table && npm run build && cd -
	cd aliyun_sls_project && npm run build && cd -
	cd aliyun_sls_logstore && npm run build && cd -
	cd aliyun_vpc && npm run build && cd -
	cd aliyun_vswitch && npm run build && cd -
	cd aliyun_security_group && npm run build && cd -

publish-all:
	cd aliyun_base && npm run build && cd -
	cd aliyun_oss_bucket && npm run build && ${S_BIN} registry publish && cd -
	cd aliyun_ots_instance && npm run build && ${S_BIN} registry publish && cd -
	cd aliyun_ots_table && npm run build && ${S_BIN} registry publish && cd -
	cd aliyun_sls_project && npm run build && ${S_BIN} registry publish && cd -
	cd aliyun_sls_logstore && npm run build && ${S_BIN} registry publish && cd -
	cd aliyun_vpc && npm run build && ${S_BIN} registry publish && cd -
	cd aliyun_vswitch && npm run build && ${S_BIN} registry publish && cd -
	cd aliyun_security_group && npm run build && ${S_BIN} registry publish && cd -
	cd ros_transformer && npm run build && ${S_BIN} registry publish && cd -

test-oss:
	@cd ./aliyun_oss_bucket/examples && ${S_BIN} deploy && cd - 

test-ots:
	@cd ./aliyun_ots_instance/examples && ${S_BIN} deploy && cd - 
	@cd ./aliyun_ots_table/examples && ${S_BIN} deploy && cd - 

test-sls:
	@cd ./aliyun_sls_project/examples && ${S_BIN} deploy && cd - 
	@cd ./aliyun_sls_logstore/examples && ${S_BIN} deploy && cd - 


test-vpc:
	@cd ./aliyun_vpc/examples && ${S_BIN} deploy && cd - 

test-vswitch:
	@cd ./aliyun_vswitch/examples && ${S_BIN} deploy && cd - 

test-sg:
	@cd ./aliyun_security_group/examples && ${S_BIN} deploy && cd - 


test-all:
	make test-oss
	make test-ots
	make test-sls
	make test-vpc
	make test-vswitch
	make test-sg

statistics:
	@wget -q https://images.devsapp.cn/tools/git-statistics.sh && bash git-statistics.sh && rm git-statistics.sh
