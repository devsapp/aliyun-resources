RES?=aliyun_base

build:
	@./help.sh build ${RES}

publish:
	@./help.sh publish ${RES}

test:
	@./help.sh test ${RES}

build-all:
	@./help.sh build

publish-all:
	@./help.sh publish

test-all:
	@./help.sh test

format-all:
	@./help.sh format

build-transformer:
	cd ros_transformer && npm run build && cd -

test-transformer: 
	cd ros_transformer/examples && s deploy && cd - 

publish-transformer: build-transformer
	cd ros_transformer && npm run build && s registry publish && cd -

statistics:
	@wget -q https://images.devsapp.cn/tools/git-statistics.sh && bash git-statistics.sh && rm git-statistics.sh


test-oss:
	@cd ./aliyun_oss_bucket/examples && s deploy && cd - 

test-ots:
	@cd ./aliyun_ots_instance/examples && s deploy && cd - 
	@cd ./aliyun_ots_table/examples && s deploy && cd - 

test-sls:
	@cd ./aliyun_sls_project/examples && s deploy && cd - 
	@cd ./aliyun_sls_logstore/examples && s deploy && cd - 

test-sg:
	@cd ./aliyun_security_group/examples && s deploy && cd - 
	@cd ./aliyun_security_group_ingress/examples && s deploy && cd - 
	@cd ./aliyun_security_group_egress/examples && s deploy && cd -


ut-test: build-all
	@./help.sh ut-test