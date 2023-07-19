S_BIN=/Users/songluo/work/Serverless-Devs/bin/s

build-transformer:
	cd ros_transformer && npm run build && cd -

test-transformer:
	cd ros_transformer/examples && ${S_BIN} deploy && cd - 

build-all:
	@./build.sh

publish-all:
	@./publish.sh

test-all:
	@./test.sh

test-oss:
	@cd ./aliyun_oss_bucket/examples && ${S_BIN} deploy && cd - 

test-ots:
	@cd ./aliyun_ots_instance/examples && ${S_BIN} deploy && cd - 
	@cd ./aliyun_ots_table/examples && ${S_BIN} deploy && cd - 

test-sls:
	@cd ./aliyun_sls_project/examples && ${S_BIN} deploy && cd - 
	@cd ./aliyun_sls_logstore/examples && ${S_BIN} deploy && cd - 

test-sg:
	@cd ./aliyun_security_group/examples && ${S_BIN} deploy && cd - 
	@cd ./aliyun_security_group_ingress/examples && ${S_BIN} deploy && cd - 
	@cd ./aliyun_security_group_egress/examples && ${S_BIN} deploy && cd -

statistics:
	@wget -q https://images.devsapp.cn/tools/git-statistics.sh && bash git-statistics.sh && rm git-statistics.sh
